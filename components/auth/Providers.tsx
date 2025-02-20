'use client'

import { BiLogoDiscord, BiLogoGoogle } from 'react-icons/bi'
import { Button } from '../ui/button'
import { useTransition } from 'react'
import { providerSignIn } from '@/lib/actions/users.actions'
import { AnimatedDiv } from '../ui/AnimatedDiv'
const Providers = () => {
	const [isPending, startTransition] = useTransition()

	const handleSignIn = (provider: 'google' | 'discord') => {
		startTransition(async () => {
			await providerSignIn(provider)
		})
	}

	return (
		<div className='space-y-3'>
			<Button
				variant="outline"
				className="w-full"
				onClick={() => handleSignIn('google')}
				disabled={isPending}
			>
				{isPending ? 'Signing in...' : 'Sign In with Google'}
				<AnimatedDiv variant={'outline'} animation={'scale'} >
					<BiLogoGoogle />
				</AnimatedDiv>
			</Button>
			<Button
				variant="outline"
				className="w-full"
				onClick={() => handleSignIn('discord')}
				disabled={isPending}
			>
				{isPending ? 'Signing in...' : 'Sign In with Discord'}
				<AnimatedDiv variant={'outline'} animation={'scale'} >
				<BiLogoDiscord />
				</AnimatedDiv>
			</Button>
		</div>
	)
}

export default Providers
