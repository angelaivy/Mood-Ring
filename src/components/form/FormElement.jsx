export default function FormElement({ type, id, value, onChange }) {
  return (
    <>
    {type === 'input' ? (
      <div className="input wrapper">
        <input 
          type='radio' 
          id={id}
          name='mood' 
          value={value}
          required 
          onChange={onChange} />
          <label htmlFor={id} aria-label={id}>{value}</label>
      </div>
     ) : (
      <div className="textarea wrapper">
        <label htmlFor={id}>Note:</label>
        <textarea 
          id={id} 
          name='note' 
          rows='5' 
          onChange={onChange}
          placeholder='Add the details...'></textarea>
      </div>
    )}
    </>
  )

}