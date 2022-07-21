import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { getCookie } from 'cookies-next';
import { socket } from '../lib/socket';
import Layout from '../components/layouts/main';
import Header from '../components/header';
import LobbyBox from '../components/lobby/box';
import Sidebar from '../components/sidebar';
import Popup from '../components/popup';
import Notification from '../components/notification';

export default function Home() {
  const router = useRouter();  
  const { status } = useSession();
  const [isLogin, setIsLogin] = useState(false);
  const [isPopup, setIsPopup] = useState(false);
  const [isNoti, setIsNoti] = useState(false);
  const [inviteId, setInviteId] = useState(null);
  const [inviteImageUrl, setInviteImageUrl] = useState(null);


  useEffect(() => {
    socket.emit('exitWait', getCookie('gitId'));
  }, []);

  useEffect(() => {
    if(isLogin) {
      console.log('islogin has cookie?????', getCookie('gitId'));
      socket.emit('setGitId', getCookie('gitId'));
      socket.on('comeon', userInfo => {
        setInviteId(userInfo.gitId);
        setInviteImageUrl(userInfo.avatarUrl);
        setIsNoti(true);
      });
    }

    return () => {
      socket.off('comeon');
    };
  }, [isLogin]);

  const goToWait = (mode) => {
    const query = mode === 'team' ? { mode, roomId: getCookie('gitId') } : { mode }

    if(isLogin) {
      router.push({
        pathname: '/code/wait',
        query
      });
    } else {
      setIsPopup(true);
    }
  };

  const goToMyPage = () => {
    if(isLogin) {
      router.push('/mypage');
    } else {
      setIsPopup(true);
    }
  };

  const onClickAccept = () => {
    const myInfo = {
      gitId: getCookie('gitId'),
      avatarUrl: getCookie('avatarUrl')
    }
    socket.emit('acceptInvite', inviteId, myInfo);
    setIsNoti(false);
    router.push({
      pathname: '/code/wait',
      query: { mode: 'team', roomId: inviteId }
    });
  };

  const onClickDecline = () => {
    setIsNoti(false);
  };

  return (
    <Layout 
    header={<Header label="마이페이지" onClickBtn={goToMyPage} checkValidUser={(isValidUser) => setIsLogin(isValidUser)} />}
      body={
        <>
          <LobbyBox mode="personal" onClick={() => goToWait('personal')}/>
          <LobbyBox mode="team" onClick={() => goToWait('team')}/>
          { isLogin && <Sidebar />}
          {
            isPopup
            && <Popup 
                title="⛔️로그인이 필요합니다.⛔️"
                content="게임에 참가하시려면 로그인이 필요합니다."
                label="메인으로"
                onClick={() => setIsPopup(false)} 
              />
          } 
          {
            isLogin 
            && isNoti
            && <Notification 
                title={`${inviteId}님이 팀전에 초대했습니다!`}
                content="게임에 참가하시겠습니까?"
                imgUrl={inviteImageUrl ?? "/default_profile.jpg"}
                onClickAccept={onClickAccept}
                onClickDecline={onClickDecline}
              />
          }
        </>
      }
    />
  )
}
