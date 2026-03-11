import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "./useAuth";
import { toast } from "react-toastify";

export const useAdmin = () => {
  const { isAdmin } = useAuth();
  const queryClient = useQueryClient();

  // Fetch Products
  const {
    data: products = [],
    isLoading: productsLoading,
    error: productsError,
  } = useQuery({
    queryKey: ["admin-products"],
    queryFn: async () => {
      console.log("Fetching products...");
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Products fetch error:", error);
        throw error;
      }

      const mapped = (data || []).map((p) => ({
        ...p,
        _id: p.id,
        subCategory: p.sub_category,
      }));
      console.log("Fetched products:", mapped);
      return mapped;
    },
    enabled: !!isAdmin,
  });

  // Create Product
  const createProduct = useMutation({
    mutationFn: async (newProduct: any) => {
      console.log("Creating product:", newProduct);
      const { error } = await supabase.from("products").insert([newProduct]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      toast.success("Product published");
    },
    onError: (err: any) => {
      console.error("Create error:", err);
      toast.error(err.message);
    },
  });

  // Update Product – fixed row check
  const updateProduct = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      console.log("Updating product:", id, data);
      const { data: updatedRows, error } = await supabase
        .from("products")
        .update(data)
        .eq("id", id)
        .select();

      if (error) throw error;
      if (!updatedRows || updatedRows.length === 0) {
        throw new Error("No product found with that ID or you don't have permission.");
      }
      console.log("Update successful, rows affected:", updatedRows.length);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      toast.success("Product updated");
    },
    onError: (err: any) => {
      console.error("Update error:", err);
      toast.error(err.message);
    },
  });

  // Delete Product – fixed row check
  const deleteProduct = useMutation({
    mutationFn: async (id: string) => {
      console.log("Deleting product:", id);
      const { data: deletedRows, error } = await supabase
        .from("products")
        .delete()
        .eq("id", id)
        .select();

      if (error) throw error;
      if (!deletedRows || deletedRows.length === 0) {
        throw new Error("No product found with that ID or you don't have permission.");
      }
      console.log("Delete successful, rows affected:", deletedRows.length);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      toast.success("Product deleted");
    },
    onError: (err: any) => {
      console.error("Delete error:", err);
      toast.error(err.message);
    },
  });

  // Fetch Orders
  const { data: orders = [], isLoading: ordersLoading } = useQuery({
    queryKey: ["admin-orders"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data || [];
    },
    enabled: !!isAdmin,
  });

  const stats = {
    totalProducts: products.length,
    totalOrders: orders.length,
    totalRevenue: orders.reduce((sum, order) => sum + (order.total_amount || 0), 0),
    recentOrders: orders.slice(0, 5),
  };

  return {
    products,
    orders,
    stats,
    loading: productsLoading || ordersLoading,
    createProduct: createProduct.mutate,
    updateProduct: updateProduct.mutate,
    deleteProduct: deleteProduct.mutate,
    deleteProductMutation: deleteProduct, // important for loading state
    isSubmitting: createProduct.isPending || updateProduct.isPending,
    productsError,
  };
};