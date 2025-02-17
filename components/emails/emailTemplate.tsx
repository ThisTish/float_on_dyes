interface EmailTemplateProps {
	greeting: string
	verificationUrl: string
	isFirst: boolean
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
	greeting,
	verificationUrl,
	isFirst
}) => (
	<div
		style={{
			fontFamily: 'Arial, sans-serif',
			textAlign: 'center',
			padding: '50px 20px',
			backgroundColor: '#CEDBE3',
		}}
	>
		<div
			style={{
				background: '#769F43',
				padding: '20px',
				boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
				maxWidth: '500px',
				margin: 'auto',

				
			}}
		>
			<div 
				style={{
					display: 'inline-flex',
					alignItems: 'center',
					justifyContent: 'center',
					gap: '10px',
				}}
			>
			<img 
				src="https://www.floatondyes.com/images/logo.png" 
				alt="Float on dyes Logo" 
				style={{
					width: '50px',
					height: '50px',
				}}
			/>
			<h1>{greeting}</h1>
			</div>
			<div
				style={{
					fontSize: '16px',
				}}
				>

				{isFirst ? (
					<p>It makes us happy you're registering for an account!</p>
				) : (
					<p>We're glad you're back to log in!</p>
				)
				}
				<p>
					Let's get you verified before you continue to peruse & shop.
				</p>
				<hr 
					style={{
						width: '50%',
						border: 'none',
						borderTop: '2px solid #ccc',
						padding: '5px'
					}}
				/>
				<p 
					style={{
						fontSize: '14px',
						fontWeight: 'lighter'
					}}
				>Click button below to verify your account.</p>
			</div>
			<a
				href={verificationUrl}
				style={{
					display: 'inline-block',
					backgroundColor: '#465D63',
					color: '#ffffff',
					padding: '12px 20px',
					textDecoration: 'none',
					fontSize: '16px',
					fontWeight: 'bolder',
					marginTop: '10px',
					border: '3px solid #ffffff'
				}}
			>
				Verify Your Account
			</a>
		</div>
	</div>
)
