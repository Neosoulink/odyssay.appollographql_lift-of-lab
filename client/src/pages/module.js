import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Layout, QueryResult } from "../components";
import ModuleDetail from "../components/module-detail";

export const GET_MODULE_AND_PARENT_TRACK = gql`
	query getModuleAndParentTrack($moduleId: ID!, $trackId: ID!) {
		module(id: $moduleId) {
			id
			title
			length
			content
			videoUrl
		}
		track(id: $trackId) {
			title
			modules {
				title
				length
				id
			}
		}
	}
`;

const Module = ({ moduleId, trackId }) => {
	const { loading, error, data } = useQuery(GET_MODULE_AND_PARENT_TRACK, {
		variables: { moduleId, trackId },
	});

	return (
		<Layout fullWidth>
			<QueryResult error={error} loading={loading} data={data}>
				<ModuleDetail module={data?.module} track={data?.track} />
			</QueryResult>
		</Layout>
	);
};

export default Module;
