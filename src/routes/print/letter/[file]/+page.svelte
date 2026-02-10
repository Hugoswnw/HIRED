<script lang="ts">
	import type { LetterData } from "$lib/types/letter";

	export let data: {
		letter: LetterData
	};
	const { letter } = data;

	const today = new Intl.DateTimeFormat('fr-FR', 
		{ day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/Paris' }
	).format(new Date());
</script>

<svelte:head>
	<title>Cover Letter - {letter.first_name} {letter.name}</title>
	{#each letter.styles as name}
		<link rel="stylesheet" href={`/files/styles/${name}.css`}>
	{/each}
</svelte:head>

<div
	class="page flex h-full w-full flex-col px-[15mm] py-[15mm] justify-between"
>
	<div class="flex flex-col">
		<div class="text-1 flex flex-col items-start">
			<p>{letter.first_name} <span class="small-caps">{letter.name}</span></p>
			<a href="tel:+33667399441">+33 6 67 39 94 41</a>
			<a href="mailto:lebaherhugo@gmail.com">lebaherhugo@gmail.com</a>
			<a href="https://www.linkedin.com/in/le-baher-hugo/">linkedin.com/in/le-baher-hugo/</a>
		</div>

		<div class="text-1 ml-auto flex flex-col items-start">
			{#each letter.recipient.split('\n') as recipientBlock, i}
				<p>{recipientBlock}</p>
			{/each}
			<p class="mt-[2mm]">Bordeaux, 26 January 2026</p>
		</div>
	</div>

	<div class="text-2 flex flex-col gap-[2mm] text-justify">
		
		{#each letter.content.split('\n') as letterBlock, i}
			{#if i === 0}
				<h1 class="font-bold text-accent">{letterBlock}</h1>
			{:else}
				<p>{letterBlock}</p>
			{/if}
		{/each}
	</div>

	<div class="ml-auto flex flex-col items-center gap-[1mm]">
		<p class="text-2">Hugo <span class="small-caps">Le Baher</span></p>
		<div
			class="h-[2.5cm] w-[5cm] icon"
			style="
				background-color: var(--accent);
				-webkit-mask: url('/img/sign.png') no-repeat center / contain;
				mask: url('/img/sign.png') no-repeat center / contain;
			"
		></div>
	</div>
</div>
