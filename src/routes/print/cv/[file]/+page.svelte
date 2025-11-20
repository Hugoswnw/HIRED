<script lang="ts">
	import type { PageData } from '../$types';
	export let data: PageData;
	const { cv } = data;

	let link_prefixes: Record<string, string> = {
		email: 'mailto:',
		phone: 'tel:',
		linkedin: 'https://www.linkedin.com/in',
	};

	// default theme
	let accent = "#1E93AB"; 
	let textColor = "black";
	let background = "#F3F2EC";
	if (cv.colors) {
		accent = cv.colors.accent; 
		textColor = cv.colors.text;
		background = cv.colors.background;
	}
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
			font-family: Outfit, Arial, sans-serif;
			overflow: hidden;

			color: var(--text);
			background-color: var(--background);
		}

		.small-caps {
			font-variant-caps: small-caps;
		}

		.serif {
			font-family: Fraunces, 'Zilla Slab', serif;
		}

		img {
			vertical-align: middle;
			height: 1.3em;
		}

		.text-0 {
			font-size: 8mm;
			line-height: 9mm;
			font-weight: 900;
			color: var(--accent);
		}

		.text-1 {
			font-size: 5.64mm;
			line-height: 7mm;
			font-weight: 700;
			color: var(--accent);
		}

		.text-2 {
			font-size: 5.5mm;
			line-height: 6.5mm;
			font-weight: 650;
			color: var(--accent);
		}

		.text-3,
		.text-4 {
			font-size: 4.2mm;
			line-height: 4.7mm;
			font-weight: 600;
			color: var(--text);
		}

		.text-4 {
			font-weight: 300;
		}

		.separator {
			background-color: var(--accent);
		}

		.icon {
			background-color: var(--accent);
		}
	</style>
</svelte:head>

<div
	class="page flex h-full w-full flex-col gap-[2mm] px-[12mm] py-[7mm]"
	style="--accent: {accent}; --text: {textColor}; --background: {background}"
>
	<header class="flex items-end gap-[5mm]">
		<div>
			<h1 class="text-0">
				{cv.first_name} <span class="small-caps">{cv.name}</span>
			</h1>
			<h1 class="text-1">{cv.job} - {cv.specialty}</h1>
			<p class="text-4 serif text-justify">{cv.introduction}</p>
		</div>

		<div class="flex flex-col text-3 gap-[1.5mm]">
			{#each Object.entries(cv.informations) as [info_type, info_value]}
				<div class="flex gap-[1.5mm] items-end">
					<div
						class="h-[1.2em] w-[1.2em] icon"
						style="
							-webkit-mask: url('/img/{info_type}.svg') no-repeat center / contain;
							mask: url('/img/{info_type}.svg') no-repeat center / contain;
						"
					></div>
					{#if link_prefixes.hasOwnProperty(info_type)}
						<a href={link_prefixes[info_type] + info_value.replace(/\s+/g, '')}>{info_value}</a>
					{:else}
						<span>{info_value}</span>
					{/if}
				</div>
			{/each}
		</div>
	</header>

	<div class="flex h-full flex-col justify-between">
		{#each cv.sections as section}
			<div class="flex flex-col gap-[.5mm]">
				<div class="flex items-end gap-2">
					<h2 class="text-2 whitespace-nowrap">{section.title}</h2>
					<div class="h-[3px] flex-grow mb-[0.55em] rounded-full separator"></div>
				</div>
				<div class="flex flex-col"
					class:gap-[0.6mm]={section.type === 'compact'}
					class:gap-[1.5mm]={section.type !== 'compact'}>
					{#each section.subsections as subsection}
						<div>
							{#if section.type === 'compact'}
								<div class="flex gap-[3mm] items-baseline">
									{#if subsection.dates}
										<h4 class="text-4 w-[10mm]">{subsection.dates?.[0]}</h4>
									{/if}
									{#if subsection.title}
										<h3 class="text-3 text-nowrap min-w-[35mm]">{subsection.title}</h3>
									{/if}
									<p class="text-4">{subsection.items.join(" | ")}</p>
								</div>
							{:else}
								{#if subsection.title}
									<div class="flex gap-[2mm]">
										<div class="w-[37mm] flex justify-between items-center text-4">
											<h4>{subsection.dates?.[0]}</h4>
											{#if subsection.dates && subsection.dates.length > 1}
												<span>-</span>
											{/if}
											<h4>{subsection.dates?.[1]}</h4>
										</div>
										<h3 class="text-nowrap text-3">{subsection.title}</h3>
									</div>
								{/if}
								<div>
									{#each subsection.items as item, i}
										<p class="text-4" class:italic={i===0}>{item}</p>
									{/each}
								</div>
							{/if}
						</div>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</div>
