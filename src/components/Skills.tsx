import { portfolioData } from '@/lib/portfolio'

export default function Skills() {
    return (
        <section id="skills" className="section-container">
            <div className="space-y-12">
                <div className="space-y-4">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                        Technical <span className="text-gradient">Skills</span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl text-lg">
                        A comprehensive list of technologies and tools I use to bring ideas to life.
                    </p>
                </div>
                
                <ul className="flex flex-wrap gap-3">
                    {portfolioData.skills.map((skill, index) => (
                        <li 
                            key={skill + index}
                            className="glass-dark px-6 py-3 rounded-2xl text-sm font-medium text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all hover:-translate-y-1 cursor-default"
                        >
                            {skill}
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}
