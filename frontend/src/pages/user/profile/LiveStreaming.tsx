import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Input,
} from '@material-tailwind/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { USER} from '../../../config/constants/constants';

const LiveStreaming = () => {
  const [roomId, setRoomId] = useState('');
  const navigate=useNavigate()
  const [error,setError]=useState('')
  const role_str="Host"

  const handleJoin=()=>{
    if(roomId.length<6){
      setError("Enter a string having atleast 6 characters")
      return 
    }
    navigate(`${USER.LIVE_ROOM}/${roomId}/${role_str}`)
  }

  return (
    <div>
      <div className="flex pt-50 justify-center">
        <Card
          className="mt-6 w-96"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <CardBody
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <Typography
              variant="h5"
              color="blue-gray"
              className="mb-2"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Live
            </Typography>
            <Input
              label="Room ID"
              size="lg"
              value={roomId}
              onChange={e=>{setRoomId(e.target.value)}}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
            {error?<p className='text-sm text-red-400'>{error}</p>:""}
          </CardBody>
          <CardFooter
            className="pt-0"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <Button
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              onClick={handleJoin}
            >
              Join
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default LiveStreaming;
