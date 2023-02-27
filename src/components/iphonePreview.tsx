import React from "react";
import styled from "styled-components";

interface IphonePreviewProps {}

export const IphonePreview: React.FC<IphonePreviewProps> = () => {
	return (
		<div style={{ position: "relative", width: "270px" }}>
			<Outline>
				<Inline>
					<Notch />
					<img src="/Openning screen 1.svg" />
				</Inline>
				<SilentButton />
				<VolumeUpButton />
				<VolumeDownButton />
				<PowerButton />
			</Outline>

			<div style={{ position: "absolute", top: "570px", left: "50%", transform: "translate(-50%,0)" }}>
				<Button
					type="outlined"
					color="#3949AB"
					// mobileView={mobileView}
				>
					<img src="/preview.svg" style={{ marginRight: "5px" }} />
					<Text
						weight={400}
						color="#3949AB"
						//  mobileView={mobileView}
					>
						preview on desktop
					</Text>
				</Button>
			</div>
		</div>
	);
};

const Outline = styled.div`
	/* position: absolute; */
	width: 271.26px;
	height: 556.46px;
	/* left: 50px; */
	/* top: 178px; */

	background: linear-gradient(180deg, #f55050 0%, #e25555 100%);
	border-radius: 38px;

	display: flex;
	justify-content: center;
	align-items: center;
`;

const Inline = styled.div`
	position: relative;
	width: 263.76px;
	height: 550.03px;
	/* left: 120.36px;
	top: 181.22px; */

	background: #232020;
	border-radius: 38px;

	display: flex;
	justify-content: center;
`;

const Notch = styled.div`
	position: absolute;
	width: 124px;
	height: 20px;
	/* left: calc(50% - 124px / 2 - 467px);
	top: 183px; */

	background: #000000;
	border-bottom-left-radius: 20px;
	border-bottom-right-radius: 20px;
`;

const SilentButton = styled.div`
	position: absolute;
	width: 3.92px;
	height: 14.37px;
	left: -2.17px;
	top: 133.18px;

	background: #e44a4a;
	border-radius: 38px;
`;

const VolumeUpButton = styled.div`
	position: absolute;
	width: 3.92px;
	height: 47.03px;
	left: -2.17px;
	top: 163.23px;

	background: #e44a4a;
	border-radius: 38px;
`;

const VolumeDownButton = styled.div`
	position: absolute;
	width: 3.92px;
	height: 47.03px;
	left: -2.17px;
	top: 219.41px;

	background: #e44a4a;
	border-radius: 38px;
`;

const PowerButton = styled.div`
	position: absolute;
	width: 3.92px;
	height: 77.08px;
	left: 269px;
	top: 183.48px;

	background: #e44a4a;
	border-radius: 38px;
	transform: matrix(-1, 0, 0, 1, 0, 0);
`;

const Button = styled.div<{ type: "outlined" | "filled"; color: string; mobileView?: boolean }>`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;

	width: ${(props) => (props.mobileView ? "80px" : "200px")};
	height: ${(props) => (props.mobileView ? "25px" : "35px")};

	background: ${(props) => (props.type === "filled" ? props.color : "white")};
	border: ${(props) => (props.type === "outlined" ? `1px solid ${props.color}` : "")};
	border-radius: 4px;

	margin-inline: 5px;
`;

const Text = styled.h4<{ weight: number; color?: string; mobileView?: boolean }>`
	font-family: "Poppins";
	font-style: normal;
	font-weight: ${(props) => props.weight};
	font-size: ${(props) => (props.mobileView ? "10px" : "16px")};
	line-height: 24px;

	display: flex;
	align-items: flex-end;

	color: ${(props) => props.color || "#ffffff"};

	flex: none;
	order: 0;
	flex-grow: 0;
`;
