import { useEffect, useState } from "react";
import { useRolePermissionStore } from "../../store/RPManager"; // Assuming your Zustand store is here

const RolePermissionManager = () => {
  const {
    roles,
    allPermissions,
    loadRolesAndPermissions,
    savePermissions,
    rolesLoading,
    permissionsLoading,
    setSelectedRole, // Set selected role in Zustand store
    setRolePermissions,
  } = useRolePermissionStore();

  const [selectedRoleState, setSelectedRoleState] = useState<string | null>(null); // Local state for the selected role
  const [selectedIds, setSelectedIds] = useState<string[]>([]); // Tracking selected permission IDs

  // Fetch roles and permissions on component mount
  useEffect(() => {
    loadRolesAndPermissions();
  }, [loadRolesAndPermissions]);

  // Only update Zustand store if selectedRoleState changes
  useEffect(() => {
    if (selectedRoleState) {
      setSelectedRole(selectedRoleState);
    }
  }, [selectedRoleState, setSelectedRole]);

  // Update selectedIds when a role is selected
  useEffect(() => {
    if (selectedRoleState) {
      const role = roles.find((r) => r._id === selectedRoleState);
      if (role) {
        const permissions = role.permissions
          .map((perm: any) => perm._id)
          .filter((id: string | undefined): id is string => id !== undefined); // Filter undefined values
        setSelectedIds(permissions); // Pre-select permissions for the selected role
        setRolePermissions(permissions); // Sync Zustand store with selected role's permissions
      }
    }
  }, [selectedRoleState, roles, setRolePermissions]);

  // Handle individual permission toggle
  const handlePermissionToggle = (permissionId: string) => {
    setSelectedIds((prevIds) => {
      const updatedIds = prevIds.includes(permissionId)
        ? prevIds.filter((id) => id !== permissionId) // Deselect permission
        : [...prevIds, permissionId]; // Select permission

      // Instead of updating Zustand directly here, we can call setRolePermissions in a useEffect
      return updatedIds;
    });
  };

  // Handle "Select All" toggle
  const handleSelectAllToggle = () => {
    setSelectedIds((prevIds) => {
      const allPermissionIds = allPermissions
        .map((perm) => perm._id)
        .filter((id: string | undefined): id is string => id !== undefined); // Filter undefined values

      return prevIds.length === allPermissionIds.length ? [] : allPermissionIds;
    });
  };

  // UseEffect to sync selectedIds with Zustand store
  useEffect(() => {
    if (selectedIds.length > 0) {
      setRolePermissions(selectedIds);
    }
  }, [selectedIds, setRolePermissions]);

  // Save updated permissions for the selected role using Zustand's `savePermissions` function
  const handleSavePermissions = async () => {
    await savePermissions();
  };

  // Check if all permissions are selected
  const areAllPermissionsSelected = selectedIds.length === allPermissions.length;

  if (rolesLoading || permissionsLoading) {
    return <div>Loading...</div>; // Show loading indicator while data is being fetched
  }

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <h2>Role Permission Manager</h2>

      {/* Role Dropdown */}
      <div>
        <label htmlFor="roleSelect">Select Role:</label>
        <select
          id="roleSelect"
          value={selectedRoleState || ""}
          onChange={(e) => setSelectedRoleState(e.target.value)} // Update local state
        >
          <option value="">-- Select a Role --</option>
          {roles.map((role) => (
            <option key={role._id} value={role._id}>
              {role.name}
            </option>
          ))}
        </select>
      </div>

      {/* Permissions List */}
      <div>
        {/* Select All Button */}
        <button onClick={handleSelectAllToggle}>
          {areAllPermissionsSelected ? "Deselect All" : "Select All"}
        </button>

        {/* Permissions List */}
        {allPermissions.map((permission) => {
          const permissionId = permission._id;
          if (!permissionId) return null; // Skip rendering if permission._id is undefined

          return (
            <div key={permissionId}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedIds.includes(permissionId)} // Check if permission is selected
                  onChange={() => handlePermissionToggle(permissionId)} // Handle toggle
                />
                {permission.name}
              </label>
              <p>{permission.description}</p>
            </div>
          );
        })}
      </div>

      {/* Save Button */}
      {selectedRoleState && <button onClick={handleSavePermissions}>Save Permissions</button>}
    </div>
  );
};

export default RolePermissionManager;
