import { User, getAuth } from 'firebase/auth';
import MaterialDialog from '../../../components/common/dialog';
import Avatar from '../../common/avatar';
import { useEmailUser } from '../../../context/user';
import { useNavigate } from 'react-router-dom';
import "./style.scss";

export default function UserSettingsDialog(
  params: {
    user: User,
    notify: (message: string, long?: boolean) => void,
    closeDialog: () => void,
  }
) {
  const auth = getAuth();
  const userContext = useEmailUser();

  const setUser = useEmailUser().update;
  const navigate = useNavigate();

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
              {params.user.displayName ?? "Mikołaj Łukawski"}
            </p>
            <p className='email'>{params.user.email}</p>
          </div>
        </div>,
        <div className='separator' />,
        <div className="option-items">
          <ItemOption
            label="Sorting: Alphabetical"
            icon='sort'
            onClick={() => { }}
          />
          <ItemOption
            label="Filter: None"
            icon='filter_list'
            onClick={() => { }}
          />
          <ItemOption
            label="Theme: System"
            icon='dark_mode'
            onClick={() => { }}
          />
          <ItemOption
            label="Sign Out"
            icon='logout'
            onClick={() => { }}
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
