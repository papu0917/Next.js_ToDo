import React, { useState } from 'react';
import Header from './components/header';
import AppBar from './components/TodoAppBar';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import RegisterDialog from './components/RegisterDialog';
import { useRecoilValue } from 'recoil';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import TodoTable from './components/TodoTable';
import { tasksState } from './atoms/Tasks';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            '&:hover': {
                backgroundColor: '#6666ff'
            }
        },
        fab: {
            position: 'absolute',
            bottom: '2rem',
            right: '2rem',
            '&:hover': {
                backgroundColor: '#6666ff'
            }
        }
    })
);

export default function Home() {
    const classes = useStyles();
    const [open, setOpen] = useState<boolean>(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const tasks = useRecoilValue(tasksState);

    return (
        <div className="container">
            <>
                <Header>
                    <AppBar />
                </Header>
                <Box padding="2rem" textAlign="center">
                    {tasks.length !== 0 ? (
                        <>
                            <TodoTable />
                            <Fab
                                className={classes.fab}
                                onClick={handleOpen}
                                color="primary"
                                aria-label="add"
                            >
                                <AddIcon />
                            </Fab>
                        </>
                    ) : (
                        <>
                            <Typography variant="subtitle1" gutterBottom>
                                まだ登録されたタスクはありません。
                            </Typography>
                            <Button
                                className={classes.button}
                                onClick={handleOpen}
                                variant="contained"
                                color="primary"
                            >
                                タスクを登録する
                            </Button>
                        </>
                    )}
                </Box>
                <RegisterDialog open={open} onClose={handleClose} />
            </>
        </div >
    )
}