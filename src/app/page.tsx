"use client";

import React, { useState, useEffect } from "react";

const Carousel = () => {
	const carouselHtml = `
    <div
      x-data='{
        activeSlide: 1,
        slides: [
          { id: 1, src: "https://picsum.photos/800/400?random=1" },
          { id: 2, src: "https://picsum.photos/800/400?random=2" },
          { id: 3, src: "https://picsum.photos/800/400?random=3" },
          { id: 4, src: "https://picsum.photos/800/400?random=4" },
        ],
        loop() {
          setInterval(() => {
            this.activeSlide = this.activeSlide === 4 ? 1 : this.activeSlide + 1;
          }, 3000);
        },
      }'
      x-init="loop"
      class="relative w-full h-full bg-gray-900 rounded-lg overflow-hidden"
    >
      <div class="overflow-hidden h-full">
        <div class="grid h-full">
          <template x-for="(slide, index) in slides" :key="slide.id">
            <div x-show="activeSlide === slide.id" x-transition.opacity.duration.1000ms class="col-start-1 row-start-1 w-full h-full">
              <img
                :src="slide.src"
                :alt="'Slide ' + slide.id"
                class="w-full h-full object-cover"
              />
            </div>
          </template>
        </div>
      </div>

      <div class="absolute inset-0 flex items-center justify-between p-4">
        <button
          x-on:click="activeSlide = activeSlide === 1 ? 4 : activeSlide - 1"
          class="bg-black bg-opacity-25 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-50 transition-colors duration-300 hover:cursor-pointer"
        >
          &#10094;
        </button>
        <button
          x-on:click="activeSlide = activeSlide === 4 ? 1 : activeSlide + 1"
          class="bg-black bg-opacity-25 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-50 transition-colors duration-300 hover:cursor-pointer"
        >
          &#10095;
        </button>
      </div>
      <div class="absolute rounded-lg bottom-3 md:bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-4 md:gap-3 bg-black/50 px-1.5 py-1 md:px-2" role="group" aria-label="slides" >
        <template x-for="(slide, index) in slides">
            <button class="size-2 rounded-full transition" x-on:click="activeSlide = index + 1" x-bind:class="[activeSlide === index + 1 ? 'bg-white' : 'bg-gray-400']" x-bind:aria-label="'slide ' + (index + 1)"></button>
        </template>
      </div>
    </div>
  `;

	return (
		<div
			className="h-full"
			dangerouslySetInnerHTML={{ __html: carouselHtml }}
		/>
	);
};

interface Company {
	id: number;
	name: string;
	industry: string;
	founded_year: number | null;
	headquarters_city: string | null;
}

const CompanyTable = () => {
	const [companies, setCompanies] = useState<Company[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchCompanies = async () => {
			try {
				const response = await fetch(
					"https://json-placeholder.mock.beeceptor.com/companies"
				);
				if (!response.ok) {
					throw new Error("Failed to fetch data");
				}
				const data = await response.json();
				setCompanies(data);
			} catch (error) {
				setError((error as Error).message);
			} finally {
				setLoading(false);
			}
		};

		fetchCompanies();
	}, []);

	if (loading) {
		return <p className="text-center text-gray-400">Loading companies...</p>;
	}

	if (error) {
		return <p className="text-center text-red-500">Error: {error}</p>;
	}

	return (
		<div className="w-full max-w-5xl mx-auto mt-8 bg-gray-900/50 rounded-lg shadow-lg p-8 backdrop-blur-sm">
			<h2 className="text-3xl font-bold mb-6 text-gray-200">Company List</h2>
			<div className="overflow-x-auto">
				<table className="w-full table-auto">
					<thead>
						<tr className="bg-gray-800 text-gray-400 uppercase text-sm leading-normal">
							<th className="py-3 px-6 text-left">Name</th>
							<th className="py-3 px-6 text-left">Industry</th>
							<th className="py-3 px-6 text-center">Founded Year</th>
							<th className="py-3 px-6 text-left">Headquarters</th>
						</tr>
					</thead>
					<tbody className="text-gray-400 text-sm font-light">
						{companies.map((company) => (
							<tr
								key={company.id}
								className="border-b border-gray-700 hover:bg-gray-800"
							>
								<td className="py-3 px-6 text-left whitespace-nowrap">
									{company.name || "N/A"}
								</td>
								<td className="py-3 px-6 text-left">
									{company.industry || "N/A"}
								</td>
								<td className="py-3 px-6 text-center">
									{company.founded_year || "N/A"}
								</td>
								<td className="py-3 px-6 text-left">
									{company.headquarters_city || "N/A"}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

const RegistrationForm = () => {
	return (
		<div className="w-full max-w-5xl mx-auto mt-8 bg-gray-900/50 rounded-lg shadow-lg p-8 backdrop-blur-sm">
			<h2 className="text-3xl font-bold mb-6 text-gray-200">
				Company Registration
			</h2>
			<form>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div className="mb-4">
						<label
							className="block text-gray-400 text-sm font-bold mb-2"
							htmlFor="companyName"
						>
							Company Name
						</label>
						<input
							className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-[#00aca8] text-gray-200"
							id="companyName"
							type="text"
							placeholder="Enter company name"
						/>
					</div>
					<div className="mb-4">
						<label
							className="block text-gray-400 text-sm font-bold mb-2"
							htmlFor="industry"
						>
							Industry Sector
						</label>
						<div className="relative">
							<select
								className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 appearance-none focus:outline-none focus:border-[#00aca8] text-gray-200"
								id="industry"
							>
								<option>Technology</option>
								<option>Finance</option>
								<option>Healthcare</option>
							</select>
							<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
								<svg
									className="fill-current h-4 w-4"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
								>
									<path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
								</svg>
							</div>
						</div>
					</div>
				</div>
				<div className="mb-6">
					<label className="block text-gray-400 text-sm font-bold mb-2">
						Employee Size
					</label>
					<div className="flex flex-wrap">
						<label className="inline-flex items-center mr-6 mb-2">
							<input
								type="radio"
								className="form-radio h-5 w-5 text-[#00aca8]"
								name="employeeSize"
								value="1-50"
							/>
							<span className="ml-2 text-gray-400">1-50</span>
						</label>
						<label className="inline-flex items-center mr-6 mb-2">
							<input
								type="radio"
								className="form-radio h-5 w-5 text-[#00aca8]"
								name="employeeSize"
								value="51-200"
							/>
							<span className="ml-2 text-gray-400">51-200</span>
						</label>
						<label className="inline-flex items-center mb-2">
							<input
								type="radio"
								className="form-radio h-5 w-5 text-[#00aca8]"
								name="employeeSize"
								value="200+"
							/>
							<span className="ml-2 text-gray-400">200+</span>
						</label>
					</div>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div className="mb-4">
						<label
							className="block text-gray-400 text-sm font-bold mb-2"
							htmlFor="email"
						>
							Contact Email
						</label>
						<input
							className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-[#00aca8] text-gray-200"
							id="email"
							type="email"
							placeholder="Enter contact email"
						/>
					</div>
					<div className="mb-4">
						<label
							className="block text-gray-400 text-sm font-bold mb-2"
							htmlFor="city"
						>
							Headquarters City
						</label>
						<input
							className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-[#00aca8] text-gray-200"
							id="city"
							type="text"
							placeholder="Enter headquarters city"
						/>
					</div>
				</div>
				<div className="mb-6">
					<label className="inline-flex items-center">
						<input
							type="checkbox"
							className="form-checkbox h-5 w-5 text-[#00aca8] rounded-full"
						/>
						<span className="ml-2 text-gray-400">
							Agree to Terms and Conditions
						</span>
					</label>
				</div>
				<div className="flex items-center justify-center">
					<button
						className="w-full md:w-auto bg-[#00aca8] hover:bg-[#007c7a] text-white font-bold py-3 px-8 rounded-full focus:outline-none focus:shadow-outline transition-colors duration-300 hover:cursor-pointer"
						type="button"
					>
						Submit
					</button>
				</div>
			</form>
		</div>
	);
};

export default function Home() {
	const [view, setView] = useState("table");
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	return (
		<div className="flex flex-col md:flex-row min-h-screen font-sans">
			{/* Carousel for Desktop */}
			<div className="hidden md:block md:w-1/2 p-8">
				{isClient && <Carousel />}
			</div>
			<div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8">
				<div className="w-full max-w-6xl text-sm md:text-base">
					<h1 className="text-3xl md:text-5xl font-bold mb-8 text-center text-gray-200">
						Company Registration
					</h1>

					{/* Carousel for Mobile */}
					<div className="md:hidden mb-8">{isClient && <Carousel />}</div>

					<div className="mt-12 text-center">
						<button
							onClick={() => setView("table")}
							className={`px-4 py-2 md:px-6 md:py-3 rounded-full font-semibold transition-colors duration-300 text-sm md:text-base hover:cursor-pointer ${
								view === "table"
									? "bg-[#00aca8] text-white shadow-lg"
									: "bg-gray-700 text-gray-200 hover:bg-gray-600"
							}`}
						>
							Company List
						</button>
						<button
							onClick={() => setView("form")}
							className={`ml-2 md:ml-4 px-4 py-2 md:px-6 md:py-3 rounded-full font-semibold transition-colors duration-300 text-sm md:text-base hover:cursor-pointer ${
								view === "form"
									? "bg-[#00aca8] text-white shadow-lg"
									: "bg-gray-700 text-gray-200 hover:bg-gray-600"
							}`}
						>
							Register Company
						</button>
					</div>
					<div className="mt-8">
						<div key={view} className="animate-fade-in">
							{view === "table" ? <CompanyTable /> : <RegistrationForm />}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
