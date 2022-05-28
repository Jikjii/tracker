import React from 'react'
import { Navbar, Container, Button, NavbarBrand } from 'react-bootstrap'
import Link from 'next/link'

const Header = () => {
    return (
        <Navbar>
            <Container>
                <NavbarBrand href="#home">
                    Porject Managment
                </NavbarBrand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text className="p-3">
                        Signed in as: <a href="#login">Mark Otto</a>
                    </Navbar.Text>
                    <Link href="/login" passHref>
                        <Button>Log out</Button>
                    </Link>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header