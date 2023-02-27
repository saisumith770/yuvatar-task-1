import styled from "styled-components";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { IphonePreview } from "./iphonePreview";
import { TopNav } from "./topNav";
import React from "react";

export const CoursePageShell: React.FC<{ children: React.ReactNode; progress?: number; onSave: () => void }> = ({ children, progress, onSave }) => {
	const collapseIphonePreview = useMediaQuery("(max-width: 1300px)");
	const phoneView = useMediaQuery("(max-width: 800px)");

	return (
		<div>
			<div style={{ height: "130px" }}>
				<TopNav onSave={onSave} noOverlap={collapseIphonePreview} />
			</div>
			<div style={{ display: "grid", gridTemplateColumns: "auto".repeat(3) }}>
				{!collapseIphonePreview && (
					<div style={{ paddingLeft: "50px", width: "200px" }}>
						<div style={{ position: "fixed" }}>
							<IphonePreview />
						</div>
					</div>
				)}

				<div style={{ gridColumnStart: 2, gridColumnEnd: 4 }}>
					<Text weight={700} size="30px" color="#121212">
						Course Landing Page
					</Text>

					<div style={{ display: "flex", paddingInline: "10px", width: "100%" }}>
						<div
							style={{
								width: phoneView ? "100%" : "300px",
								position: "relative",
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								marginRight: "100px",

								left: phoneView ? "50%" : "",
								transform: phoneView ? "translate(-50%, 0)" : "",
							}}
						>
							<img src="/play-video.svg" style={{ position: "absolute" }} />
							<img src="/play-video-circle.svg" style={{ position: "absolute" }} />
							<img src="/landing-video.svg" style={{ width: "100%" }} />
						</div>

						{!phoneView && (
							<div
								style={{
									display: "flex",
									flexDirection: "column",
									alignItems: "center",
									height: "150px",
									width: "300px",
									position: "relative",
								}}
							>
								<Text weight={600} size="18px" color="#121212" style={{ position: "absolute", top: "-50px" }}>
									Progress
								</Text>
								<img src="/semi-circle-progress-bar.svg" style={{ width: "400px", position: "relative", bottom: "15px" }} />
								{progress && (
									<img
										src="/filled-progress.svg"
										style={{ position: "absolute", width: "130px", bottom: "-23px", left: "-18px" }}
									/>
								)}
								<img src="/semi-circle-progress-display.svg" style={{ width: "250px", position: "absolute", bottom: "-55px" }} />

								<h4
									style={{
										fontFamily: "Roboto",
										fontWeight: 400,
										fontSize: "13px",
										position: "absolute",
										bottom: "10px",
										color: "#555770",
									}}
								>
									Percentage
								</h4>

								<h4 style={{ fontFamily: "Roboto", fontWeight: 600, position: "absolute", bottom: "-30px", fontSize: "20px" }}>
									{progress || 0}%
								</h4>
							</div>
						)}
					</div>

					<div style={{ width: "730px", height: "100px", marginTop: "10px" }}>
						{/* page content goes in here */}
						{children}
					</div>
				</div>
			</div>
		</div>
	);
};

const Text = styled.h4<{ weight: number; size: string; color?: string; mobileView?: boolean }>`
	font-family: "Poppins";
	font-style: normal;
	font-weight: ${(props) => props.weight};
	font-size: ${(props) => (props.mobileView ? "10px" : props.size)};
	line-height: 0;

	display: flex;
	align-items: flex-end;

	color: ${(props) => props.color || "#ffffff"};

	flex: none;
	order: 0;
	flex-grow: 0;
`;
