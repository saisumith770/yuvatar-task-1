import React, { useRef } from "react";
import styled from "styled-components";

export const DropDownMenu: React.FC<{ data: (string | number)[]; setData: (data: string | number) => void }> = ({ data, setData }) => {
	return (
		<div
			style={{
				width: "230px",

				position: "absolute",
				borderRadius: "10px",

				backgroundColor: "#F8FBFC",
				boxShadow: "0 0 50px #ccc",
				overflow: "hidden",
				zIndex: 10,
			}}
		>
			{data.map((item, index) => (
				<HoveredDiv key={index} onClick={() => setData(item)}>
					<Text>{item}</Text>
				</HoveredDiv>
			))}
		</div>
	);
};

const Text = styled.h4`
	font-family: "Poppins";
	font-style: normal;
	font-weight: 600;
	font-size: 16px;
	line-height: 0px;

	color: black;
`;

const HoveredDiv = styled.div`
	width: 100%;
	padding: 5px 10px 10px 5px;
	cursor: pointer;

	&:hover {
		background-color: #e9e9e9;
	}
`;
