interface EmailTemplateProps {
    name: string;
    email: string;
    message: string;
}

export function EmailTemplate({ name, email, message }: EmailTemplateProps) {
    return (
        <div>
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> {name}</p>
            <p><strong>Email:</strong> {email}</p>
            <hr />
            <p style={{ whiteSpace: 'pre-wrap' }}>{message}</p>
        </div>
    );
}
