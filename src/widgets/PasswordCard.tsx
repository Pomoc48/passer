import '../css/PasswordCard.css'

function PasswordCard(params: {
  name: string,
  username: string,
  password: string,
  website: string,
}) {
  return <div className='PasswordCard'>
    <div>{params.name}</div>
    <div>{params.website}</div>
    <div>{params.username}</div>
    <div>{params.password}</div>
  </div>
}

export default PasswordCard
