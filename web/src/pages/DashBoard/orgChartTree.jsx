import React, { useEffect, useState } from "react";
import axios from "axios";
import { activeEnvironment } from "../../services/apiConfig";
import { toast } from "react-toastify";

// Recursive component to display tree nodes
const TreeNode = ({ node }) => {
  return (
    <div className="ml-4 mt-2 border-l-2 border-blue-300 pl-4">
      <div className="font-semibold text-gray-700">
        {node.name} <span className="text-sm text-gray-500">({node.role})</span>
      </div>
      {node.children && node.children.length > 0 && (
        <div className="mt-2">
          {node.children.map((child, index) => (
            <TreeNode key={index} node={child} />
          ))}
        </div>
      )}
    </div>
  );
};

const OrgTree = () => {
  const [orgTree, setOrgTree] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchOrgTree = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${activeEnvironment}/org-tree`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrgTree(res.data);
    } catch (err) {
      toast.error("Failed to load organization tree");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrgTree();
  }, []);

  return (
    <div className="p-6 bg-white rounded-xl shadow-md max-w-3xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">Organization Hierarchy</h2>
      {isLoading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : orgTree ? (
        <TreeNode node={orgTree} />
      ) : (
        <div className="text-center text-red-500">No data available</div>
      )}
    </div>
  );
};

export default OrgTree;
