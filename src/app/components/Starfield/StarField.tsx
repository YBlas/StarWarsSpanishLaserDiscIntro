'use client';

import { ReactNode, CSSProperties } from 'react';
import StarLayer from './StarLayer';
import './StarField.css';

type StarfieldProps = {
  density?: number;
};

const Starfield = ({
  density = 1,
}: StarfieldProps) => {
  return (
    <div className="starfield">
      <StarLayer count={Math.floor(300 * density)} size={1} />
      <StarLayer count={Math.floor(150 * density)} size={2} />
      <StarLayer count={Math.floor(70 * density)} size={3} />
    </div>
  );
};

export default Starfield;