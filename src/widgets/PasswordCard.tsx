import '../scss/widgets/PasswordCard.scss'

function PasswordCard(params: {
  name: string,
  username: string,
  password: string,
  website: string,
}) {
  return <div className='PasswordCard'>
    <div className='Name'>{params.name}</div>
    <div className='Info'>
      <div>{params.website}</div>
      <div>{params.username}</div>
    </div>

    <div className='Actions'>
      <button type='button'>Visit</button>
      <button type='button'>Copy</button>
    </div>
  </div>
}

export default PasswordCard
