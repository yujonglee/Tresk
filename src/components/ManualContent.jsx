import { BottomNavigation, BottomNavigationAction, Typography } from '@material-ui/core';
import {
  BookRounded,
  RotateLeftRounded,
  UndoRounded,
  HelpOutline,
} from '@material-ui/icons';
import { useState } from 'react';

export default function ManualContent() {
  const [value, setValue] = useState('help');

  const handleChange = (e, nextValue) => {
    setValue(nextValue);
  };

  const contents = {
    restore: (
      <Typography>
        <br />
        최근에 완료한 할 일부터 하나씩 복구해요.
        <br />
        원래 위치로 그대로 돌아간답니다.
      </Typography>
    ),
    logbook: (
      <Typography>
        <br />
        완료한 할 일들이 시간 순서대로 모여있어요.
        <br />
        할 일 앞에는 # 이 붙어있는데, 많을수록 더 하위에 있던 할 일이에요.
      </Typography>
    ),
    reset: (
      <Typography>
        <br />
        완료한 할 일 목록을 초기화해요.
        <br />
        이후에는 복구할 수 없어요.
      </Typography>
    ),
    help: (
      <Typography>
        Tresk는 무한 깊이로 할 일을 관리할 수 있는 앱이에요.
        <br />
        할 일은 언제나 빨간색으로 선택된 항목 아래로 추가된답니다.
        <br />
        각 항목을 클릭하거나 키보드 상하좌우키를 이용해 변경할 수 있어요.
      </Typography>
    ),
  };

  return (
    <>
      <BottomNavigation value={value} onChange={handleChange}>
        <BottomNavigationAction label="Restore" value="restore" icon={<UndoRounded />} />
        <BottomNavigationAction label="LogBook" value="logbook" icon={<BookRounded />} />
        <BottomNavigationAction label="Reset" value="reset" icon={<RotateLeftRounded />} />
        <BottomNavigationAction label="Help" value="help" icon={<HelpOutline />} />
      </BottomNavigation>
      {contents[value]}
    </>
  );
}
