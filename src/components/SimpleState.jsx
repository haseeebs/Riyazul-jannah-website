const stats = [
    { id: 1, name: 'Satisfied Pilgrims', value: '1000+' },
    { id: 2, name: 'Years Experience', value: '10+' },
    { id: 3, name: 'Led by an experienced Aalim fluent in Arabic & English', value: 'Guide' },
]

const SimpleState = () => {
    return (
        <div className="relative py-16 sm:py-24 bg-lime-50 z-10 backdrop-filter backdrop-blur-sm">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
                    {stats.map((stat) => (
                        <div key={stat.id} className="mx-auto flex max-w-xs flex-col gap-y-4">
                            <dt className="text-base leading-7 text-lime-900 max-w-52">{stat.name}</dt>
                            <dd className="order-first text-3xl font-semibold tracking-tight text-lime-900 sm:text-5xl">
                                {stat.value}
                            </dd>
                        </div>
                    ))}
                </dl>
            </div>
        </div>
    )
};

export default SimpleState;