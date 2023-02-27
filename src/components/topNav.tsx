import React from "react";
import styled from "styled-components";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { useWindowSize } from "../hooks/useWindowSize";

interface TopNavPageProps {
	noOverlap: boolean;
	onSave: () => void;
}

export const TopNav: React.FC<TopNavPageProps> = ({ noOverlap, onSave }) => {
	const mobileView = useMediaQuery("(max-width: 600px)");
	const { width } = useWindowSize();
	return (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				paddingInline: "50px",
				height: "144px",
				width: `${width}px`,
				position: "fixed",
				backgroundColor: noOverlap ? "white" : "",
				zIndex: 20,
			}}
		>
			{!mobileView && <LogoFont>Youvatar</LogoFont>}
			<div style={{ display: "flex" }}>
				{mobileView && (
					<Button type="outlined" color="#3949AB" mobileView={mobileView}>
						<img src="/preview.svg" style={{ marginRight: mobileView ? "5px" : "15px" }} />
						<Text weight={400} color="#3949AB" mobileView={mobileView}>
							preview
						</Text>
					</Button>
				)}
				<Button type="filled" color="#3949AB" mobileView={mobileView} onClick={onSave}>
					<Text weight={600} mobileView={mobileView}>
						Save Draft
					</Text>
				</Button>
			</div>
		</div>
	);
};

const LogoFont = styled.h4`
	font-family: "Poppins";
	font-weight: 800;
	font-size: 40px;
	line-height: 36px;
	color: #3949ab;
`;

const Button = styled.div<{ type: "outlined" | "filled"; color: string; mobileView?: boolean }>`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;

	width: ${(props) => (props.mobileView ? "80px" : "120px")};
	height: ${(props) => (props.mobileView ? "25px" : "35px")};

	background: ${(props) => (props.type === "filled" ? props.color : "white")};
	border: ${(props) => (props.type === "outlined" ? `1px solid ${props.color}` : "")};
	border-radius: 4px;

	margin-inline: 5px;

	position: relative;
	transform: translate(-100px, 0);

	cursor: pointer;
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
