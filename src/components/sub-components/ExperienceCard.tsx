import portfolioData from '../../../portfolio.json';

type Experience = typeof portfolioData.experiences[number]

interface ExperienceCardProps {
    experience: Experience
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience }) => {
    const { companyName, position, dateOfEmployment } = experience
    return (
        <div className='w-full flex flex-col justify-center items-center'>
            <div>{position}</div>
            <div>{companyName}</div>
            <div>
                {dateOfEmployment.from} - {dateOfEmployment.to}
            </div>
        </div>
    )
}

export default ExperienceCard