import React from 'react';
import { RxCross2 } from 'react-icons/rx';

interface FilterTipProps {
  name: string;
  removeFilter: (name: string) => void;
}

const FilterTip = ({ name, removeFilter }: FilterTipProps) => {
  return (
    <div className='inline-block bg-gray-100 rounded-sm mr-2 px-2 py-[0.5]'>
        <div className='flex flex-row items-center'>
            <span className='mr-3 text-xs'>{name}</span>
            <div className='cursor-pointer p-1' onClick={() => removeFilter(name)}>
                <RxCross2  />
            </div>
        </div>
    </div>
  );
};

export default FilterTip;
