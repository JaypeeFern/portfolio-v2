import portfolioData from '../../portfolio.json'

export default function About() {
    const { name, personalDescription, socialLinks } = portfolioData.about
    return (
        <section id="about" className='flex flex-col gap-4 *:text-center'>
            <p>{name}</p>
            <p>{personalDescription}</p>
            <p>{socialLinks.github}</p>
            <p>{socialLinks.linkedin}</p>
        </section>
    )
}