import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "./useAuth";
import { toast } from "react-toastify";

export const useAdmin = () => {
  const { isAdmin } = useAuth();
  const queryClient = useQueryClient();

  console.log('useAdmin - isAdmin:', isAdmin);

  // Fetch Products
  const {
    data: products = [],
    isLoading: productsLoading,
    error: productsError,
    refetch: refetchProducts
  } = useQuery({
    queryKey: ["admin-products"],
    queryFn: async () => {
      console.log("Fetching products for admin...");
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Products fetch error:", error);
        throw error;
      }

      console.log("Raw products from DB:", data);

      const mapped = (data || []).map((p) => ({
        ...p,
        _id: p.id,
        subCategory: p.sub_category,
      }));
      
      console.log("Mapped products:", mapped);
      return mapped;
    },
    enabled: !!isAdmin,
  });

  // Create Product
  const createProduct = useMutation({
    mutationFn: async (newProduct: any) => {
      console.log("Creating product:", newProduct);
      const { data, error } = await supabase
        .from("products")
        .insert([newProduct])
        .select();
      
      if (error) throw error;
      console.log("Product created:", data);
      return data;
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

  // Update Product
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
      console.log("Update successful:", updatedRows);
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

  // Delete Product
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
      console.log("Delete successful:", deletedRows);
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
      console.log("Fetching orders for admin...");
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      console.log("Orders fetched:", data);
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
    deleteProductMutation: deleteProduct,
    isSubmitting: createProduct.isPending || updateProduct.isPending,
    productsError,
    refetchProducts,
  };
};