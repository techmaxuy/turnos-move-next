import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const result = await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: 'techmax@adinet.com.uy',
    subject: 'Hello World',
    html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
  });

export default function SendPage() {
    return (
        <div>
            <h1>Send</h1>
            <p>{JSON.stringify(result)}</p>
            <p>Check your inbox!</p>
        </div>
    );
}  
