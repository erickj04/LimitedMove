import { useState } from 'react';
import Campaign from "./Campaign";
import Creative from './Creative';
export default function App() {
  const [creativeMode, setCreativeMode] = useState(false);
  return (
    <div>
      {!creativeMode ? 
        <Campaign creativeMode={creativeMode} setCreativeMode={setCreativeMode} />
      :
        <Creative creativeMode={creativeMode} setCreativeMode={setCreativeMode} />}
    </div>
  );
}