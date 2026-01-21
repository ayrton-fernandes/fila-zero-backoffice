import { useQuery, useMutation } from "@apollo/client/react";
import { GET_USERS, CREATE_USER } from "@/services/graphql/users";
import { User } from "@/domain/entities/User";

export function useUsersList() {
    const { data, loading, error, refetch } = useQuery<{ users: User[] }>(GET_USERS);

    return {
        users: data?.users || [],
        loading,
        error,
        refreshList: refetch,
    };
}

export function useCreateUser() {
    const [createUser, { loading, error }] = useMutation(CREATE_USER);

    return {
        createUser,
        loading,
        error,
    };
}
