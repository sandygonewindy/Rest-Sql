const insertSql = (content, tableName) => {
    const columns = Object.keys(content).map((ele) => {
        return ("\"" + ele + "\"");
    });
    let values = Object.values(content).map((ele) => {
        if(ele === null){
            return "NULL"
        }else{
            if(typeof ele === "string"){
                // double quotes are interpreted as identifiers
                return ("\'" + ele + "\'");
            }
            else{
                return ele;    
            }
        }
    });
    const query = `INSERT INTO ${tableName}(${columns}) VALUES (${values});`;
    return query;
}

const deleteSql = (content, tableName) => {
    const id  = "\'" + content + "\'"; 
    const query = `DELETE FROM ${tableName} WHERE id = ${id};`; // for string values '' is necessary
    return query;
}

const createSql = (tableName) => {
    const query = `
                CREATE TABLE IF NOT EXISTS ${tableName}(
                    id VARCHAR(255) PRIMARY KEY,
                    unique_name VARCHAR(255),
                    type VARCHAR(255),
                    prefix VARCHAR(255),
                    tenant_id INT8,
                    is_root_type BOOL,
                    is_folder BOOL,
                    folder_name VARCHAR(255),
                    device_mapping_enabled BOOL,
                    multi_device_mapping_enabled BOOL,
                    device_mapping_precedence INT,
                    p_entity_metric_names VARCHAR(255),
                    p_entity_metric_labels VARCHAR(255),
                    p_ignore_metric_for_labels VARCHAR(255),
                    p_entity_display_name_metric_labels VARCHAR(255),
                    p_entity_display_label_value VARCHAR(255),
                    p_parent_entity_metric_names VARCHAR(255),
                    p_parent_entity_metric_labels VARCHAR(255),
                    p_entity_agent_id_labels VARCHAR(255),
                    lookup_agent_id_from_parent VARCHAR(255),
                    p_device_metric_names VARCHAR(255),
                    p_device_metric_labels VARCHAR(255),
                    agent_type VARCHAR(255),
                    graph_by_default VARCHAR(255),
                    kpi VARCHAR(255),
                    supported_metrics VARCHAR(255),
                    version VARCHAR(255),
                    revision VARCHAR(255),
                    release VARCHAR(255),
                    parent_id VARCHAR(255),
                    p_entity_agent_id_labels_secondary VARCHAR(255),
                    p_device_metric_labels_secondary VARCHAR(255),
                    exclude_label_list_for_entity VARCHAR(255)
                );
            `
    return query;
}

export {insertSql, createSql, deleteSql};

// INSERT INTO PROMETHEUS_METADATA_MAPPING(
//     id, unique_name, type, prefix, tenant_id, is_root_type, is_folder, folder_name, device_mapping_enabled, device_mapping_precedence, p_entity_metric_names, p_entity_metric_labels, p_entity_display_name_metric_labels, p_parent_entity_metric_labels, p_entity_agent_id_labels, p_device_metric_names, p_device_metric_labels, agent_type, graph_by_default, kpi, supported_metrics, version, revision,release, parent_id)
//     VALUES ('node_node','node_node', 'Node', 'node', '${tenantId}',true, true, 'Node', true, 0, 'node_uname_info', null, null, null, 'instance', 'node_uname_info', 'nodename','Exporter', null, null, 'node_uname_info', '20.08', '20.08.00', '00', null);