import './register-input.css';

export default function RegisterInput({ title, type, placeholder, onChange, value}) {
  return (
        <>
            <label htmlFor="">{title}:</label>
            <input type={type} className='register-input' placeholder={placeholder} value={value || ''} onChange={e => onChange(e.target.value)} />
        </>
  );
}