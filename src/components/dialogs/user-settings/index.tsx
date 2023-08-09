import { User, getAuth } from 'firebase/auth';
import MaterialDialog from '../../../components/common/dialog';
import Avatar from '../../common/avatar';
import { useEmailUser } from '../../../context/user';
import { useNavigate } from 'react-router-dom';
import "./style.scss";
import { signUserOut } from '../../../functions/auth';
import { updateTheme } from '../../..';
import { useEffect, useState } from 'react';
import { capitalize } from '../../../functions/utils';
import { Sorting } from '../../../pages/manager';

export default function UserSettingsDialog(
  params: {
    user: User,
    sorting: Sorting,
    notify: (message: string, long?: boolean) => void,
    closeDialog: () => void,
    setSorting: (sorting: Sorting) => void,
  }
) {
  const auth = getAuth();

  const setUser = useEmailUser().update;
  const navigate = useNavigate();

  const [themeName, setThemeName] = useState("");

  useEffect(() => {
    let theme = localStorage.getItem("theme");

    if (theme === "dark" || theme === "light") {
      setThemeName(capitalize(theme));
      return;
    }

    setThemeName("System");
  }, []);

  function toggleSorting() {
    if (params.sorting === "alphabetical") {
      params.setSorting("newest");
      return;
    }

    if (params.sorting === "newest") {
      params.setSorting("oldest");
      return;
    }

    params.setSorting("alphabetical");
    return;
  }

  function toggleTheme() {
    let theme = localStorage.getItem("theme");

    if (theme === "dark") {
      localStorage.setItem("theme", "system");
      setThemeName("System");
      updateTheme();
      return;
    }

    if (theme === "light") {
      localStorage.setItem("theme", "dark");
      setThemeName("Dark");
      updateTheme();
      return;
    }

    localStorage.setItem("theme", "light");
    setThemeName("Light");
    updateTheme();
  }

  return (
    <MaterialDialog
      class='user-settings'
      closeFunction={params.closeDialog}
      dismissible={true}
      content={[
        <div className='user-info'>
          <Avatar user={params.user} big={true} />
          <div className='text'>
            <p className='name'>
              {params.user.displayName ?? "Passer user"}
            </p>
            <p className='email'>{params.user.email}</p>
          </div>
        </div>,
        <div className='separator' />,
        <div className="option-items">
          <ItemOption
            label={"Sorting: " + capitalize(params.sorting)}
            icon='sort'
            onClick={toggleSorting}
          />
          <ItemOption
            label="Filter: None"
            icon='filter_list'
            onClick={() => { }}
          />
          <ItemOption
            label={"Theme: " + themeName}
            icon='dark_mode'
            onClick={toggleTheme}
          />
          <ItemOption
            label="Sign Out"
            icon='logout'
            onClick={() => signUserOut(auth, setUser, navigate)}
          />
        </div>,
      ]}
      actions={[]}
    />
  );
}

function ItemOption(
  params: {
    label: string,
    icon: string,
    onClick: () => void,
  }
) {
  return (
    <div className='item-option' onClick={params.onClick}>
      <span className="material-icons">{params.icon}</span>
      <p>{params.label}</p>
    </div>
  );
}
