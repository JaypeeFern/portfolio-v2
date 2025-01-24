import portfolioData from '../../portfolio.json'

export default function Skills() {
    return (
        <section id="skills">
            <ul className='flex gap-4'>
                {portfolioData.skills.map((skill, index) => (
                    <li key={skill + index}>{skill}</li>
                ))}
            </ul>
        </section>
    )
}