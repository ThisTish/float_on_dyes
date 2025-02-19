import { APP_NAME } from "@/lib/constants"

interface EmailTemplateProps {
	greeting: string
	verificationUrl: string
	isFirst: boolean
	isReset: boolean
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
	greeting,
	verificationUrl,
	isFirst,
	isReset
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
				width: '450px',
				margin: 'auto',
			}}
		>
			<div
				style={{
					display: 'inline-flex',
					alignItems: 'center',
					justifyContent: 'center',
					gap: '10px',
					margin: '20px 0 10px 0'
				}}
			>
				<img
					src="https://www.floatondyes.com/images/logo.png"
					alt="Float on dyes Logo"
					style={{
						width: '50px',
						height: '70px',
						margin: '10px 20px 0 0'
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
					<p>We're happy that want to sign up for an account with<br /> {APP_NAME}!</p>
				) : isReset ? (
					null
				) : (
					<p>We're glad you're back to log in to <br /> {APP_NAME}!</p>
				)}
				{isReset ? (
					<p>
						Let's get your password changed so you can continue to peruse & shop.
					</p>
				) : (
					<p>
						Let's get you verified before you continue to peruse & shop.
					</p>

				)}
				<hr
					style={{
						width: '50%',
						border: 'none',
						borderTop: '2px solid #ccc',
						padding: '5px',
						margin: '20px auto'
					}}
				/>
				<p
					style={{
						fontSize: '14px',
						fontWeight: 'lighter'
					}}
				>
					{isReset ? (
						'Click the button below to reset your password.'
					) : (
						'Click button below to verify your account.'
					)}

				</p>
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
					marginBottom: '20px',
					border: '3px solid #ffffff'
				}}
			>{
					isReset ? (
						'Reset Your Password'
					) : (
						'Verify Your Account'
					)
				}
			</a>
		</div>
	</div>
)
