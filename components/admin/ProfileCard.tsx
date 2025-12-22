type Props = {
  name: string,
  subtitle?: string,
}

export default function ProfileCard({
  name,
  subtitle,
}: Props) {

  return (
    <div className="w-full rounded-lg border p-6 shadow-lg">
      <h1 className="mb-6 text-center text-2xl font-bold">{name}</h1>
      <p className="text-center text-gray-500">
        {subtitle || ''}
      </p>
    </div>
  )
}
