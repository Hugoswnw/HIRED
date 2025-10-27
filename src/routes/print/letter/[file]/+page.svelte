<script lang="ts">
	export let data;
	const { letterData } = data;

	let accent = '#1E93AB';
	let textColor = 'black';
	let background = '#F3F2EC';

	const options = { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/Paris' };
	const today = new Intl.DateTimeFormat('fr-FR', options).format(new Date());
</script>

<svelte:head>
	<style>
		@page {
			size: A4;
			margin: 0;
		}

		.page {
			width: 210mm;
			height: 297mm;
			margin: 0 auto;
			font-family: Fraunces, 'Zilla Slab', serif;
			overflow: hidden;

			color: var(--text);
			background-color: var(--background);
		}

		.small-caps {
			font-variant-caps: small-caps;
		}

		.sans-serif {
			font-family: Outfit, sans-serif;
		}

		img {
			vertical-align: middle;
			height: 1.3em;
		}

		.text-0,
		.text-1 {
			font-size: 4.6mm;
			line-height: 5.5mm;
			color: var(--text);
		}

		.text-0 {
			font-weight: 800;
		}

		.text-1 {
			font-weight: 400;
		}

		.text-2 {
			font-size: 4mm;
			line-height: 4.6mm;
			font-weight: 350;
		}

		.text-accent {
			color: var(--accent);
		}

		.icon {
			background-color: var(--accent);
		}
	</style>
</svelte:head>

<div
	class="page flex h-full w-full flex-col px-[15mm] py-[15mm] justify-between"
	style="--accent: {accent}; --text: {textColor}; --background: {background}"
>
	<div class="flex flex-col">
		<div class="text-1 sans-serif flex flex-col items-start">
			<p class="text-0">Hugo <span class="small-caps">Le Baher</span></p>
			<a href="tel:+33667399441">+33 6 67 39 94 41</a>
			<a href="mailto:lebaherhugo@gmail.com">lebaherhugo@gmail.com</a>
		</div>

		<div class="text-1 sans-serif ml-auto flex flex-col items-start">
			<p class="text-0">CEA Cesta</p>
			<p>15 Avenue des Sablières</p>
			<p>33116 Le Barp Cedex </p>
		</div>
	</div>

	<div class="text-2 flex flex-col gap-[2mm] text-justify">
		<p class="mb-[5mm]">Le {today}.</p>
		{#each letterData.split('\n') as letterBlock, i}
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
				-webkit-mask: url('/img/sign.png') no-repeat center / contain;
				mask: url('/img/sign.png') no-repeat center / contain;
			"
		></div>
	</div>
</div>
