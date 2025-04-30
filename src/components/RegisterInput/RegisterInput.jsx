import './register-input.css';

export default function RegisterInput({ title, type, placeholder, onChange}) {
  return (
        <>
            <label htmlFor="">{title}:</label>
            <input type={type} className='register-input' placeholder={placeholder} onChange={e => onChange(e.target.value)} />
        </>
  );
}