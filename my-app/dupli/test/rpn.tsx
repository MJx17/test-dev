import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Checkbox,
  Grid,
  Collapse,
} from "@mui/material";
import { useRolePermissionStore } from "../../store/RPManager";
import { categoryBackgrounds} from "../../utils/ColorGenerator";
import '../../styles/global.scss'

import Loading from "../../utils/loading";
import RoleForm from '../AdminPages/Roles'
import PermissionForm from '../AdminPages/Permissions'



const RolePermissionManager = () => {
  const {
    roles,
    allPermissions,
    loadRolesAndPermissions,
    savePermissions,
    rolesLoading,
    permissionsLoading,
    setSelectedRole,
    setRolePermissions,
  } = useRolePermissionStore();

  const [selectedRoleState, setSelectedRoleState] = useState<string | null>(
    null
  );
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<{ [key: string]: boolean }>({});

  // Group permissions by category
  const groupedPermissions = allPermissions.reduce((acc, permission) => {
    const category = permission.category || "Uncategorized";
    if (!acc[category]) acc[category] = [];
    acc[category].push(permission);
    return acc;
  }, {} as { [key: string]: any[] });

  // Fetch roles and permissions on mount
  useEffect(() => {
    loadRolesAndPermissions();
  }, [loadRolesAndPermissions]);

  // Handle role selection
  useEffect(() => {
    if (selectedRoleState) {
      setSelectedRole(selectedRoleState);
      const role = roles.find((r) => r._id === selectedRoleState);
      if (role) {
        const permissions = role.permissions
          .map((perm: any) => perm._id)
          .filter((id: string | undefined): id is string => id !== undefined);
        setSelectedIds(permissions);
        setRolePermissions(permissions);
      }
    }
  }, [selectedRoleState, roles, setSelectedRole, setRolePermissions]);

  // Sync selected permissions with Zustand
  useEffect(() => {
    setRolePermissions(selectedIds);
  }, [selectedIds, setRolePermissions]);

  // Handle individual permission toggle
  const togglePermission = (permissionId: string) => {
    setSelectedIds((prevIds) =>
      prevIds.includes(permissionId)
        ? prevIds.filter((id) => id !== permissionId)
        : [...prevIds, permissionId]
    );
  };

  // Toggle category expansion
  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  // Save permissions
 // Save permissions
const save = async () => {
  await savePermissions();  // Save permissions
  await loadRolesAndPermissions();  // Refetch roles and permissions after saving
};


  if (rolesLoading || permissionsLoading) {
    return <Loading />; // Use the Loading component
  }

 



  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        Role Permission Manager
      </Typography>



      {/* Role Dropdown */}
      <div style={{ marginBottom: "20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
       
        <select
          id="roleSelect"
          value={selectedRoleState || ""}
          onChange={(e) => setSelectedRoleState(e.target.value)}
          style={{
            marginLeft: "10px",
            padding: "5px",
            fontSize: "16px",
            width: "200px", // Optional: adjust width as needed
            textAlign: "center",
          }}
        >
          <option value="">-- Select a Role --</option>
          {roles.map((role) => (
            <option key={role._id} value={role._id}>
              {role.name}
            </option>
          ))}
        </select>
      </div>



      {selectedRoleState && (
        <div style={{marginBottom: "20px", textAlign: "center" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={save}
          >
            Save Permissions
          </Button>
        </div>
      )}

        <RoleForm/>

        <PermissionForm/>
      


      <Grid container spacing={2}>
        {Object.entries(groupedPermissions).map(([category, permissions], index) => {
          const showMore = permissions.length > 4; // Check if permissions exceed 4
          const visiblePermissions = permissions.slice(0, 4); // First 4 permissions
          const hiddenPermissions = permissions.slice(4); // Remaining permissions

          // Define different background colors based on the index
          const cardBackgroundColor = categoryBackgrounds[index % categoryBackgrounds.length]; // Cycle through the colors

          return (
            <Grid item xs={12} sm={6} md={4} key={category}>
              <Card style={{ backgroundColor: cardBackgroundColor }}>
                <CardContent>
                  <Typography
                    variant="h6"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center", // Ensure button and title align vertically
                      marginBottom: "16px", // Add some space below the category title
                    }}
                  >
                    {category}
                    {showMore && (
                      <Button
                        size="small"
                        onClick={() => toggleCategory(category)}
                        style={{ padding: "4px 10px" }} // Slight padding adjustment
                      >
                        {expandedCategories[category] ? "Hide" : "Show More"}
                      </Button>
                    )}
                  </Typography>
                  {/* Render always-visible permissions */}
                  <div style={{ marginTop: "10px" }}>
                    {visiblePermissions.map((permission) => (
                      <div
                        key={permission._id}
                        style={{
                          display: "flex", // Align checkbox and permission name in a row
                          alignItems: "center", // Vertically center items
                          marginBottom: "8px", // Adjusted margin for better spacing
                        }}
                      >
                        <Checkbox
                          checked={selectedIds.includes(permission._id)}
                          onChange={() => togglePermission(permission._id)}
                          style={{ marginRight: "10px" }} // Ensure there's space between checkbox and name
                        />
                        <Typography variant="body2">{permission.name}</Typography>
                      </div>
                    ))}
                  </div>
                  {/* Render collapsible permissions if more than 4 */}
                  {showMore && (
                    <Collapse in={expandedCategories[category] || false}>
                      <div style={{ marginTop: "10px" }}>
                        {hiddenPermissions.map((permission) => (
                          <div
                            key={permission._id}
                            style={{
                              display: "flex", // Align checkbox and permission name in a row
                              alignItems: "center", // Vertically center items
                              marginBottom: "8px", // Adjusted margin for better spacing
                            }}
                          >
                            <Checkbox
                              checked={selectedIds.includes(permission._id)}
                              onChange={() => togglePermission(permission._id)}
                              style={{ marginRight: "10px" }} // Ensure there's space between checkbox and name
                            />
                            <Typography variant="body2">{permission.name}</Typography>
                          </div>
                        ))}
                      </div>
                    </Collapse>
                  )}
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>






      {/* Save Button */}
     
    </div>
  );
};

export default RolePermissionManager;
