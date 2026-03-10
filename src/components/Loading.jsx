export default function Loading() {
  return (
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh'}}>
      <img style={{width: '10%'}} src='/spinner.gif' aria-label='loading'/>
    </div>
  )
}