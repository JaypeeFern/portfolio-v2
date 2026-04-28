interface EmailTemplateProps {
    name: string;
    email: string;
    message: string;
    ip: string;
    date: string;
}

export function EmailTemplate({ name, email, message, ip, date }: EmailTemplateProps) {
    return (
        <div style={{ backgroundColor: '#f4f4f5', padding: '40px 20px', fontFamily: 'sans-serif', color: '#333' }}>
            <div style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#ffffff', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)' }}>
                {/* Header */}
                <div style={{ backgroundColor: '#18181b', padding: '24px', color: '#ffffff' }}>
                    <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '600' }}>New Contact Inquiry</h2>
                </div>

                {/* Body */}
                <div style={{ padding: '32px 24px' }}>
                    <p style={{ margin: '0 0 8px', fontSize: '14px', color: '#71717a' }}><strong>Name:</strong> <span style={{ color: '#18181b' }}>{name}</span></p>
                    <p style={{ margin: '0 0 24px', fontSize: '14px', color: '#71717a' }}><strong>Email:</strong> <span style={{ color: '#18181b' }}>{email}</span></p>
                    
                    <div style={{ backgroundColor: '#f4f4f5', padding: '16px', borderRadius: '6px' }}>
                        <p style={{ margin: 0, whiteSpace: 'pre-wrap', lineHeight: '1.6', fontSize: '15px' }}>{message}</p>
                    </div>

                    <div style={{ marginTop: '32px' }}>
                        <a 
                            href={`mailto:${email}?subject=Re: Your portfolio inquiry`}
                            style={{ 
                                display: 'inline-block', 
                                padding: '12px 24px', 
                                backgroundColor: '#18181b', 
                                color: '#ffffff', 
                                textDecoration: 'none', 
                                borderRadius: '6px',
                                fontWeight: '600',
                                fontSize: '14px'
                            }}
                        >
                            Reply to {name}
                        </a>
                        <p style={{ fontSize: '12px', color: '#a1a1aa', marginTop: '12px', lineHeight: '1.4' }}>
                            (Clicking this button opens a clean draft without quoting this form submission)
                        </p>
                    </div>
                </div>

                {/* Footer / Metadata */}
                <div style={{ backgroundColor: '#fafafa', borderTop: '1px solid #e4e4e7', padding: '16px 24px' }}>
                    <p style={{ margin: '0 0 4px', fontSize: '12px', color: '#a1a1aa' }}><strong>Date:</strong> {date}</p>
                    <p style={{ margin: 0, fontSize: '12px', color: '#a1a1aa' }}><strong>IP Address:</strong> {ip}</p>
                </div>
            </div>
        </div>
    );
}
