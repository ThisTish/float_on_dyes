interface EmailTemplateProps {
	greeting: string
	verificationUrl: string
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
	greeting,
	verificationUrl,
}) => (
	<div
		style={{
			fontFamily: 'Arial, sans-serif',
			textAlign: 'center',
			padding: '20px',
			backgroundColor: '#f4f4f4',
		}}
	>
		<div
			style={{
				background: '#ffffff',
				padding: '20px',
				borderRadius: '10px',
				boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
				maxWidth: '500px',
				margin: 'auto',
			}}
		>
			<h1>{greeting}</h1>
			<p>
				It makes us happy you're registering for an account! Let's just get you
				verified before you continue to peruse and shop.
			</p>
			<p>Click the button below to verify your account.</p>
			<a
				href={verificationUrl}
				style={{
					display: 'inline-block',
					backgroundColor: '#007bff',
					color: '#ffffff',
					padding: '12px 20px',
					textDecoration: 'none',
					borderRadius: '5px',
					fontSize: '16px',
					fontWeight: 'bold',
					marginTop: '20px',
				}}
			>
				Verify Your Account
			</a>
		</div>
	</div>
)
