
type HeaderProps = {
  title: string;
}

const Headers = ({title}: HeaderProps) => {
  return (
  <header className="flex justify-start h-11 bg-cyan-600">
    <h1 className="flex items-center h-full pl-2 text-2xl font-bold text-fuchsia-50">{title}</h1>
  </header>
  )
}

export default Headers;