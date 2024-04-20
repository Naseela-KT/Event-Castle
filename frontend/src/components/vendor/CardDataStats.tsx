import React, { ReactNode } from 'react';

interface CardDataStatsProps {
  title: string;
  value: number | undefined;
  children: ReactNode;
}

const CardDataStats: React.FC<CardDataStatsProps> = ({
  title,
 value,
  children,
}) => {
  return (
    <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
        {children}
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <h4 className="text-title-md font-bold text-black dark:text-white">
            {title}
          </h4>
          <h4 className="text-title-md font-bold text-black dark:text-white">
          {value}
          </h4>
       
        </div>

        
      </div>
    </div>
  );
};

export default CardDataStats;
