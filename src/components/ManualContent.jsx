import { useState } from 'react';
import {
  BottomNavigation,
  BottomNavigationAction,
  Typography,
} from '@material-ui/core';
import {
  AddRounded,
  UndoRounded,
  BookRounded,
  RotateLeftRounded,
  HelpOutline,
} from '@material-ui/icons';

export default function ManualContent() {
  const [value, setValue] = useState('help');

  const handleChange = (e, nextValue) => {
    setValue(nextValue);
  };

  const contents = {
    add: (
      <Typography>
        <br />
        입력한 할 일을 선택된 항목 아래로 추가해요.
        <br />
        선택된 항목은 빨간색으로 표시돼고,
        <br />
        클릭 또는 상하좌우 키로 변경할 수 있어요.
      </Typography>
    ),
    restore: (
      <Typography>
        <br />
        <br />
        최근에 완료한 할 일부터 하나씩 복구해요.
        <br />
        원래 위치로 그대로 돌아간답니다.
        <br />
      </Typography>
    ),
    logbook: (
      <Typography>
        <br />
        완료한 할 일들이 시간 순서대로 모여있어요.
        <br />
        할 일 앞에는 # 이 붙어있는데,
        <br />
        많을수록 더 하위에 있던 할 일이에요.
      </Typography>
    ),
    reset: (
      <Typography>
        <br />
        <br />
        완료한 할 일 목록을 초기화해요.
        <br />
        이후에는 복구할 수 없어요.
        <br />
      </Typography>
    ),
    help: (
      <Typography>
        <br />
        Tresk는 무한 깊이로 확장되는 To-do 앱이에요.
        <br />
        자연에서 관찰되는 자기 유사성에서 영감을 받았어요.
        <br />
        첫 화면의 나무도 프랙탈 구조를 이용한 것이랍니다.
      </Typography>
    ),
  };

  return (
    <>
      <BottomNavigation value={value} onChange={handleChange}>
        <BottomNavigationAction label="Add" value="add" icon={<AddRounded />} />
        <BottomNavigationAction label="Restore" value="restore" icon={<UndoRounded />} />
        <BottomNavigationAction label="LogBook" value="logbook" icon={<BookRounded />} />
        <BottomNavigationAction label="Reset" value="reset" icon={<RotateLeftRounded />} />
        <BottomNavigationAction label="Help" value="help" icon={<HelpOutline />} />
      </BottomNavigation>
      <div style={{ textAlign: 'center' }}>
        {contents[value]}
      </div>
    </>
  );
}
