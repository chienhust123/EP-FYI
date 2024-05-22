import { useAuth } from "@/share/hooks/auth"
import { Avatar, Menu } from "@mantine/core"
import { IconBrandGoogleFilled, IconLogout } from "@tabler/icons-react";


export const UserInfo = () => {
  const { isLoggedIn, account } = useAuth();

  return <Menu shadow="md" width={200}>
    <Menu.Target>
      <Avatar src={account?.picture ?? null} size='md' alt={`Picture of ${account?.name}`} />
    </Menu.Target>

    <Menu.Dropdown>
      {
        !isLoggedIn ? <Menu.Item
          leftSection={<IconBrandGoogleFilled />}
        >
          Login with Google
        </Menu.Item> : <Menu.Item
          leftSection={<IconLogout />}
        >
          Logout
        </Menu.Item>
      }
    </Menu.Dropdown>
  </Menu>
}