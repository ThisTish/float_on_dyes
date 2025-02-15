import { BiLogoDiscord, BiLogoGoogle } from "react-icons/bi"
import { Button } from "../ui/button"
import { signIn } from "@/auth"
import { useSearchParams } from "next/navigation"

const Providers = () => {
	
	// const searchParams = useSearchParams()

	// const callbackUrl = searchParams.get('callbackUrl') || '/'

	return (
		<div className="flex gap-3">
			<Button
				variant={'outline'}
				className="w-full"
				onClick={() => signIn('google', {
					redirect: false,
					callbackUrl: '/'
				})}
			>
				Sign In with Google
				<BiLogoGoogle />
			</Button>
			<Button
				variant={'outline'}
				className="w-full"
				onClick={() => signIn('discord', {
					redirect: false,
					callbackUrl: '/'
				})}
			>
				Sign In with Discord
				<BiLogoDiscord />
			</Button>
		</div>
	)
}

export default Providers