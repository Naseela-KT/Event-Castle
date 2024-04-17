/* eslint-disable react-hooks/rules-of-hooks */
import { useParams } from 'react-router-dom';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';



function randomID(len: number) {
  let result = '';
  if (result) return result;
  const chars =
      '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
    maxPos = chars.length;
  let i;
  len = len || 5;
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}


const Room = () => {
  const { roomId,role_str} = useParams();
  const role =
    role_str === 'Host'
      ? ZegoUIKitPrebuilt.Host
        : ZegoUIKitPrebuilt.Audience;

  const sharedLinks: { name: string; url: string; }[] = [];
  if (role === ZegoUIKitPrebuilt.Host) {
    sharedLinks.push({
      name: 'Join as co-host',
      url:`http://localhost:5000/room/${roomId}/Host`
    });
  }

  sharedLinks.push({
    name: 'Join as audience',
    url:`http://localhost:5000/room/${roomId}/Audience`
  });

  const myMeeting = async (element: any) => {
    // generate Kit Token
    const appID = 237473876;
    const serverSecret = 'df5e0edc6640af07112600bf0dc84a4c';
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomId!,
      randomID(5),
      randomID(5),
    );

    const zp = ZegoUIKitPrebuilt.create(kitToken);

    zp.joinRoom({
        container: element,
        scenario: {
          mode: ZegoUIKitPrebuilt.LiveStreaming,
          config: {
            role,
          },
        },
        sharedLinks:sharedLinks,   
    });
   
  };

  

  
  return (
    <div style={{ width: '100vw', height: '100vh', paddingTop: 50 }}>
    <div ref={myMeeting}></div>
  
  </div>
  );
};

export default Room;


