'use client'

import { BiLogoDiscord } from 'react-icons/bi'
import { FcGoogle } from "react-icons/fc"
import { BsDiscord } from "react-icons/bs"
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
					<FcGoogle />
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
					<BsDiscord className='group-hover:text-[#5562EA]' />
				</AnimatedDiv>
			</Button>
		</div>
	)
}

export default Providers
